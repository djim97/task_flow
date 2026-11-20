export type TaskStatus = 'TODO' | 'DOING' | 'DONE';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Role = 'OWNER' | 'MEMBER';

export interface Task {   
    id: number;   
    projectId: number;   
    title: string;   
    description: string;   
    status: TaskStatus;   
    priority: Priority;   
    assigneeId: number | null;   
    dueDate: string | null;  
    createdAt: string;
 }
 
 /** Données du formulaire ; Board complète id, statut, projet et createdAt. */
export type TaskDraft = Pick<Task, 'title' | 'description' | 'priority' | 'dueDate'>

export interface User {   
    id: number;   
    name: string;   
    email: string;   
 }

 export interface Project {   
    id: number;   
    name: string;   
    description: string;
    ownerId: number;
 }
 export interface Membership {   
    id: number;   
    projectId: number;   
    userId: number;    

 }

 export interface Comment {   
    id: number;   
    taskId: number;   
    userId: number;   
    body: string;   
    createdAt: string;
 }