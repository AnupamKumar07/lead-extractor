import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { deduplicationService } from '@/lib/services/deduplicationService'
import { enrichmentService } from '@/lib/services/enrichmentService'

/**
 * Enterprise Import API (Layer 2 -> 5)
 * Moves raw data into the Premium CRM Tables utilizing intelligence layers.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { rawPayload, source, type } = body

        if (!rawPayload || !source || !type) {
            return NextResponse.json({ error: 'Missing required payload: rawPayload, source, type' }, { status: 400 })
        }

        let apiProcessedResults = {
            created: 0,
            merged: 0,
            enriched: 0,
            errors: [] as string[]
        }

        // --- Handle Leads ---
        if (type === 'lead') {
            for (const item of rawPayload) {
                try {
                    // 1. Save to Raw Table (Layer 2)
                    const { data: rawRecord, error: rawError } = await supabase
                        .from('raw_leads')
                        .insert({
                            raw_data: item,
                            source: source,
                            extracted_email: item.email || null,
                            extracted_linkedin: item.linkedin_url || null
                        })
                        .select()
                        .single()

                    if (rawError) throw new Error(`Raw Insert Failed: ${rawError.message}`)

                    // 2. Deduplication Engine (Layer 3)
                    let emailToUse = (item.email || "").toLowerCase().trim();
                    const dedupeResult = await deduplicationService.checkLeadExists(emailToUse, item.linkedin_url, item.phone);

                    // 3. Enrichment Engine (Layer 4 & 5)
                    const enrichment = enrichmentService.analyzeLead(item.job_title, item.company_description);

                    // Base calculated score
                    let final_score = 10; // base score Just for existing
                    final_score += enrichment.lead_score_boost;

                    // Confidence calculation
                    let confidence = 0;
                    if (item.first_name) confidence += 20;
                    if (item.email) confidence += 40;
                    if (item.linkedin_url) confidence += 20;
                    if (item.job_title) confidence += 20;

                    let finalLeadPayload = {
                        first_name: item.first_name,
                        last_name: item.last_name,
                        email: emailToUse || null,
                        job_title: item.job_title,
                        linkedin_url: item.linkedin_url,
                        source: source,
                        status: 'New' as any,
                        data_confidence_score: confidence,
                        lead_score: final_score,
                        opportunity_score: enrichment.is_decision_maker ? 85 : 40,
                        engagement_status: 'Cold',
                        freshness_tag: 'Recently Updated',
                        deal_potential_estimate: enrichment.opportunity_summary,
                        smart_tags: enrichment.recommended_tags
                    };

                    if (dedupeResult.exists && dedupeResult.id) {
                        // Merge (Update)
                        await supabase.from('leads').update(finalLeadPayload).eq('id', dedupeResult.id);
                        apiProcessedResults.merged++;
                    } else {
                        // Creates brand new
                        const { error: insertError } = await supabase.from('leads').insert(finalLeadPayload);
                        if (insertError) throw new Error(`Insert failed: ${insertError.message}`);
                        apiProcessedResults.created++;
                    }

                    // Mark Raw as Processed
                    await supabase.from('raw_leads').update({ processed: true }).eq('id', rawRecord.id);
                    apiProcessedResults.enriched++;

                } catch (e: any) {
                    apiProcessedResults.errors.push(`Failed on item [${item.email || 'unknown'}]: ${e.message}`)
                }
            }
        }

        // --- Handle Companies ---
        else if (type === 'company') {
            for (const item of rawPayload) {
                try {
                    // 1. Raw Layer
                    const { data: rawRecord, error: rawError } = await supabase
                        .from('raw_companies')
                        .insert({
                            raw_data: item,
                            source: source,
                            extracted_domain: item.domain || null
                        })
                        .select()
                        .single()

                    if (rawError) throw new Error(`Raw Insert Failed: ${rawError.message}`)

                    // 2. Deduplication Layer
                    let domainToUse = (item.domain || "").toLowerCase().trim();
                    const dedupeResult = await deduplicationService.checkCompanyExists(domainToUse, item.name);

                    // 3. Enrichment Layer
                    const compEnrichment = enrichmentService.analyzeCompany(item.description, item.employee_count);

                    let finalCompanyPayload = {
                        name: item.name,
                        domain: domainToUse || null,
                        website: item.website,
                        industry: item.industry || 'Unknown',
                        estimated_company_size: compEnrichment.estimated_size,
                        funding_status: compEnrichment.funding_signal,
                        verification_status: 'Verified API'
                    }

                    if (dedupeResult.exists && dedupeResult.id) {
                        await supabase.from('companies').update(finalCompanyPayload).eq('id', dedupeResult.id);
                        apiProcessedResults.merged++;
                    } else {
                        const { error: insertError } = await supabase.from('companies').insert(finalCompanyPayload);
                        if (insertError) throw new Error(`Insert failed: ${insertError.message}`);
                        apiProcessedResults.created++;
                    }

                    await supabase.from('raw_companies').update({ processed: true }).eq('id', rawRecord.id);
                    apiProcessedResults.enriched++;

                } catch (e: any) {
                    apiProcessedResults.errors.push(`Failed to process company [${item.name || 'unknown'}]: ${e.message}`)
                }
            }
        }

        return NextResponse.json({
            success: true,
            summary: apiProcessedResults
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
