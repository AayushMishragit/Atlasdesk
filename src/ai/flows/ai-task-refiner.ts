'use server';
/**
 * @fileOverview An AI assistant for refining high-level tasks.
 *
 * - refineTask - A function that refines a high-level task description into sub-tasks, scope, and actionable steps.
 * - AiTaskRefinerInput - The input type for the refineTask function.
 * - AiTaskRefinerOutput - The return type for the refineTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTaskRefinerInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('A high-level description of a task that needs refinement.'),
});
export type AiTaskRefinerInput = z.infer<typeof AiTaskRefinerInputSchema>;

const AiTaskRefinerOutputSchema = z.object({
  suggestedSubTasks: z
    .array(z.string())
    .optional()
    .describe(
      'A list of suggested sub-tasks to break down the main task. Can be empty if not applicable.'
    ),
  refinedTaskScope: z
    .string()
    .optional()
    .describe('A clarified and more detailed scope of the task. Can be empty if not applicable.'),
  actionableSteps: z
    .array(z.string())
    .optional()
    .describe(
      'A list of actionable steps or initial steps to begin working on the task. Can be empty if not applicable.'
    ),
});
export type AiTaskRefinerOutput = z.infer<typeof AiTaskRefinerOutputSchema>;

export async function refineTask(input: AiTaskRefinerInput): Promise<AiTaskRefinerOutput> {
  return aiTaskRefinerFlow(input);
}

const aiTaskRefinerPrompt = ai.definePrompt({
  name: 'aiTaskRefinerPrompt',
  input: {schema: AiTaskRefinerInputSchema},
  output: {schema: AiTaskRefinerOutputSchema},
  prompt: `You are an expert task refinement assistant. Your goal is to help users break down complex tasks and clarify their scope.

Given the following high-level task description, suggest sub-tasks, clarify the task's scope, and propose actionable steps. Provide at least one of these outputs. If a particular category is not relevant or you cannot provide meaningful suggestions, omit that field from the JSON output.

High-level Task Description: "{{{taskDescription}}}"

Your response MUST be a JSON object conforming to the AiTaskRefinerOutputSchema.`, 
});

const aiTaskRefinerFlow = ai.defineFlow(
  {
    name: 'aiTaskRefinerFlow',
    inputSchema: AiTaskRefinerInputSchema,
    outputSchema: AiTaskRefinerOutputSchema,
  },
  async input => {
    const {output} = await aiTaskRefinerPrompt(input);
    return output!;
  }
);
