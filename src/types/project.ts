export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'review' | 'completed';
  progress: number;
  dueDate: string;
  teamIds: string[];
}
