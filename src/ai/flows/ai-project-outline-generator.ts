'use server';
/**
 * @fileOverview An AI agent that generates a project outline based on a project goal.
 *
 * - generateProjectOutline - A function that handles the project outline generation process.
 * - AiProjectOutlineGeneratorInput - The input type for the generateProjectOutline function.
 * - AiProjectOutlineGeneratorOutput - The return type for the generateProjectOutline function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiProjectOutlineGeneratorInputSchema = z.object({
  projectGoal: z.string().describe('The main goal or objective of the project.'),
});
export type AiProjectOutlineGeneratorInput = z.infer<typeof AiProjectOutlineGeneratorInputSchema>;

const AiProjectOutlineGeneratorOutputSchema = z.object({
  projectName: z.string().describe('A suggested name for the project.'),
  projectOverview: z.string().describe('A brief overview or description of the project.'),
  projectPhases: z.array(
    z.object({
      phaseName: z.string().describe('The name of the project phase (e.g., Planning, Development, Testing).'),
      tasks: z.array(z.string()).describe('A list of suggested tasks for this project phase.'),
    })
  ).describe('An array of project phases, each containing a list of tasks.'),
});
export type AiProjectOutlineGeneratorOutput = z.infer<typeof AiProjectOutlineGeneratorOutputSchema>;

export async function generateProjectOutline(input: AiProjectOutlineGeneratorInput): Promise<AiProjectOutlineGeneratorOutput> {
  return aiProjectOutlineGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProjectOutlineGeneratorPrompt',
  input: { schema: AiProjectOutlineGeneratorInputSchema },
  output: { schema: AiProjectOutlineGeneratorOutputSchema },
  prompt: `You are an expert project manager. Your task is to generate a detailed project outline based on the user's project goal.

The outline should include a suggested project name, a brief overview, and a breakdown into logical project phases. Each phase must contain a list of concrete, actionable tasks.

Project Goal: {{{projectGoal}}}

Ensure the output is a JSON object matching the following schema:

`,
});

const aiProjectOutlineGeneratorFlow = ai.defineFlow(
  {
    name: 'aiProjectOutlineGeneratorFlow',
    inputSchema: AiProjectOutlineGeneratorInputSchema,
    outputSchema: AiProjectOutlineGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
