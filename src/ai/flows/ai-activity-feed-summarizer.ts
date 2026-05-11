'use server';
/**
 * @fileOverview An AI agent that summarizes activity feed items.
 *
 * - summarizeActivityFeed - A function that generates a concise summary of activity feed items.
 * - AiActivityFeedSummarizerInput - The input type for the summarizeActivityFeed function.
 * - AiActivityFeedSummarizerOutput - The return type for the summarizeActivityFeed function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiActivityFeedSummarizerInputSchema = z.object({
  activityItems: z
    .array(z.string())
    .describe('A list of individual activity feed items, each as a string.'),
  timePeriod: z
    .string()
    .describe(
      'The time period for which to summarize the activity, e.g., "daily", "weekly".'
    ),
});
export type AiActivityFeedSummarizerInput = z.infer<
  typeof AiActivityFeedSummarizerInputSchema
>;

const AiActivityFeedSummarizerOutputSchema = z.object({
  summary: z.string().describe('A concise, AI-generated summary of the activity feed.'),
});
export type AiActivityFeedSummarizerOutput = z.infer<
  typeof AiActivityFeedSummarizerOutputSchema
>;

export async function summarizeActivityFeed(
  input: AiActivityFeedSummarizerInput
): Promise<AiActivityFeedSummarizerOutput> {
  return aiActivityFeedSummarizerFlow(input);
}

const activityFeedSummarizerPrompt = ai.definePrompt({
  name: 'activityFeedSummarizerPrompt',
  input: {schema: AiActivityFeedSummarizerInputSchema},
  output: {schema: AiActivityFeedSummarizerOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing team activity feeds.
Your goal is to provide a concise, AI-generated summary of the most important updates and changes from the provided activity items over the specified time period. Focus on key achievements, significant changes, and important discussions.

Time Period: {{{timePeriod}}}

Activity Feed Items:
{{#each activityItems}}- {{{this}}}
{{/each}}

Generate a summary of the activity feed items for the {{{timePeriod}}} period, highlighting the most important updates and changes. The summary should be concise and allow a team member to quickly stay informed and prioritize their attention.`,
});

const aiActivityFeedSummarizerFlow = ai.defineFlow(
  {
    name: 'aiActivityFeedSummarizerFlow',
    inputSchema: AiActivityFeedSummarizerInputSchema,
    outputSchema: AiActivityFeedSummarizerOutputSchema,
  },
  async input => {
    const {output} = await activityFeedSummarizerPrompt(input);
    return output!;
  }
);
