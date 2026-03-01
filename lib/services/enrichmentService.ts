export interface EnrichmentResult {
    industry?: string;
    company_size?: string;
    funding_indicator?: string;
    is_decision_maker?: boolean;
    lead_score_boost: number;
    recommended_tags: string[];
    opportunity_summary?: string;
}

/**
 * Enrichment & Intelligence Engine (Layer 4 & 5)
 * Analyzes unstructured data fields and hints provided via the scraper
 * to classify companies and estimate intent.
 */
export const enrichmentService = {

    analyzeLead(title?: string, description?: string): EnrichmentResult {
        let result: EnrichmentResult = { lead_score_boost: 0, recommended_tags: [] };

        const titleLower = (title || "").toLowerCase();

        // 1. Decision Maker Check
        const decisionMakerRoles = ['founder', 'ceo', 'cto', 'president', 'owner', 'director', 'vp', 'head'];
        if (decisionMakerRoles.some(role => titleLower.includes(role))) {
            result.is_decision_maker = true;
            result.lead_score_boost += 15;
            result.recommended_tags.push("Decision Maker");
        }

        // 2. High Growth / AI indicators from description or title
        const techKeywords = ['ai', 'machine learning', 'saas', 'cloud', 'fintech', 'blockchain'];
        if (techKeywords.some(kw => (description || "").toLowerCase().includes(kw) || titleLower.includes(kw))) {
            result.lead_score_boost += 20;
            result.recommended_tags.push("High-Growth Tech");
        }

        // 3. Simple Summary Generation
        if (result.is_decision_maker) {
            result.opportunity_summary = "High-priority decision maker. Strong potential for direct outreach.";
        } else {
            result.opportunity_summary = "Standard lead. Could be a champion or recommender.";
        }

        return result;
    },

    analyzeCompany(description?: string, employee_count?: string): any {
        let score_boost = 0;
        let tags: string[] = [];

        const descLower = (description || "").toLowerCase();

        // Detect Bootstrapped vs Funded mentions
        if (descLower.includes("venture") || descLower.includes("series a") || descLower.includes("funded")) {
            score_boost += 20;
            tags.push("Venture Funded");
        } else if (descLower.includes("bootstrapped")) {
            score_boost += 10;
            tags.push("Bootstrapped");
        }

        // Determine size category if not explicitly given
        let size_category = employee_count;
        if (!size_category) {
            if (descLower.includes("enterprise") || descLower.includes("global")) {
                size_category = "1000+";
                tags.push("Enterprise");
            } else if (descLower.includes("startup") || descLower.includes("small team")) {
                size_category = "1-10";
                tags.push("Early Stage");
            }
        }

        return {
            estimated_size: size_category,
            funding_signal: tags.includes("Venture Funded") ? "Funded" : "Unverified",
            company_score_boost: score_boost,
            company_tags: tags
        };
    }
};
