import { config } from 'dotenv';
config();

import '@/ai/flows/ai-task-refiner.ts';
import '@/ai/flows/ai-activity-feed-summarizer.ts';
import '@/ai/flows/ai-project-outline-generator.ts';