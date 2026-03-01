import { supabase } from "@/lib/supabaseClient";

/**
 * Deduplication Engine (Layer 3)
 * Checks uniqueness heavily across emails, LinkedIn URLs, and domain names.
 */
export const deduplicationService = {

    async checkLeadExists(email?: string, linkedin?: string, phone?: string): Promise<{ exists: boolean, id?: string, confidence: number }> {
        if (!email && !linkedin && !phone) return { exists: false, confidence: 0 };

        let query = supabase.from('leads').select('id, email, linkedin_url, phone');
        if (email) query = query.or(`email.eq.${email.trim().toLowerCase()}`);
        if (linkedin) query = query.or(`linkedin_url.eq.${linkedin.trim()}`);
        if (phone) query = query.or(`phone.eq.${phone.trim()}`);

        const { data, error } = await query;
        if (error || !data || data.length === 0) return { exists: false, confidence: 0 };

        const match = data[0];
        let confidence = 0;
        if (email && match.email === email.trim().toLowerCase()) confidence += 50;
        if (linkedin && match.linkedin_url === linkedin.trim()) confidence += 40;
        if (phone && match.phone === phone.trim()) confidence += 30;

        return {
            exists: true,
            id: match.id,
            confidence: Math.min(100, confidence)
        };
    },

    async checkCompanyExists(domain?: string, name?: string): Promise<{ exists: boolean, id?: string, confidence: number }> {
        if (!domain && !name) return { exists: false, confidence: 0 };

        let query = supabase.from('companies').select('id, domain, name');

        // Exact domain match is highest priority
        if (domain) {
            const { data } = await supabase.from('companies').select('id').eq('domain', domain.toLowerCase().trim()).single();
            if (data) return { exists: true, id: data.id, confidence: 100 };
        }

        // Fallback to name match
        if (name) {
            const { data } = await supabase.from('companies').select('id').ilike('name', `%${name.trim()}%`).limit(1);
            if (data && data.length > 0) return { exists: true, id: data[0].id, confidence: 85 }; // High likelihood but technically not 100%
        }

        return { exists: false, confidence: 0 };
    }
};
