import { JSONStorage, LocalStorage } from "@brushy/localstorage";
import { delay } from "@/core/utils/delay";

export class TaskHttpService implements Task.Service {
  // Storage keys
  private static readonly TASK_GROUPS_KEY = "task-groups";
  private static readonly SELECTED_GROUP_ID_KEY = "task-selected-group-id";
  private static readonly ONBOARDING_KEY = "onboarding";
  
  // Onboarding steps
  private static readonly STEPS = [
    'create-group',
    'add-task',
    'complete-task',
    'filter-tasks',
    'share-group'
  ];
  
  // Storage instances
  private storage = new JSONStorage("@task-groups");
  private selectedGroupStorage = new LocalStorage("@task-selected-group");
  public onboardingStorage = new JSONStorage("@task-onboarding");

  private DEFAULT_STORAGE_OPTIONS = {
    ttl: 1000 * 60 * 60 * 24 * 365, // 1 year
  };

  constructor() {
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    await this.initializeTaskGroups();
    await this.initializeOnboarding();
  }

  private async initializeTaskGroups(): Promise<void> {
    const groups = await this.getTaskGroups();
    if (groups.length > 0) return;

    const defaultGroup = {
      id: crypto.randomUUID(),
      name: "My Tasks",
      tasks: []
    };

    this.storage.setJSON(
      TaskHttpService.TASK_GROUPS_KEY,
      [defaultGroup],
      this.DEFAULT_STORAGE_OPTIONS
    );
  }

  private async initializeOnboarding(): Promise<void> {
    const onboarding = this.onboardingStorage.getJSON(TaskHttpService.ONBOARDING_KEY);
    if (onboarding) return;
    
    await this.resetOnboarding();
  }

  async getTaskGroups(): Promise<Task.Group[]> {
    await delay(200);
    const groups = await this.storage.getJSON(TaskHttpService.TASK_GROUPS_KEY) as Task.Group[] || [];
    return groups;
  }

  async getTaskGroupById(id: string): Promise<Task.Group | undefined> {
    await delay(200);
    const groups = await this.getTaskGroups();
    return groups.find(group => group.id === id);
  }

  async createTaskGroup(name: string): Promise<Task.Group> {
    await delay(200);
    const groups = await this.getTaskGroups();

    const newGroup: Task.Group = {
      id: crypto.randomUUID(),
      name,
      tasks: [],
    };

    const updatedGroups = [...groups, newGroup];
    this.storage.setJSON(TaskHttpService.TASK_GROUPS_KEY, updatedGroups, this.DEFAULT_STORAGE_OPTIONS as any);

    if (groups.length === 0) {
      await this.selectTaskGroup(newGroup.id);
    }

    return newGroup;
  }

  async deleteTaskGroup(id: string): Promise<boolean> {
    await delay(200);
    const groups = await this.getTaskGroups();
    const updatedGroups = groups.filter(group => group.id !== id);
    
    if (updatedGroups.length === groups.length) {
      return false;
    }

    this.storage.setJSON(TaskHttpService.TASK_GROUPS_KEY, updatedGroups, this.DEFAULT_STORAGE_OPTIONS as any);
    await this.handleGroupDeletion(id, updatedGroups);
    
    return true;
  }

  private async handleGroupDeletion(deletedId: string, remainingGroups: Task.Group[]): Promise<void> {
    const selectedGroupId = await this.getSelectedTaskGroupId();
    if (selectedGroupId !== deletedId) return;
    
    if (remainingGroups.length > 0) {
      await this.selectTaskGroup(remainingGroups[0].id);
    } else {
      this.selectedGroupStorage.remove(TaskHttpService.SELECTED_GROUP_ID_KEY);
    }
  }

  async addTask(groupId: string, text: string): Promise<Task.Root> {
    await delay(200);
    const groups = await this.getTaskGroups();
    const groupIndex = this.findGroupIndex(groups, groupId);
    
    const newTask: Task.Root = {
      id: Date.now(),
      text,
      completed: false,
    };
    
    const updatedGroup = this.addTaskToGroup(groups[groupIndex], newTask);
    const updatedGroups = this.updateGroupInList(groups, groupIndex, updatedGroup);
    
    this.storage.setJSON(TaskHttpService.TASK_GROUPS_KEY, updatedGroups, this.DEFAULT_STORAGE_OPTIONS as any);
    await this.checkOnboardingProgress('add-task');
    
    return newTask;
  }

  private findGroupIndex(groups: Task.Group[], groupId: string): number {
    const groupIndex = groups.findIndex(group => group.id === groupId);
    if (groupIndex === -1) {
      throw new Error(`Task group with ID ${groupId} not found`);
    }
    return groupIndex;
  }

  private addTaskToGroup(group: Task.Group, task: Task.Root): Task.Group {
    return {
      ...group,
      tasks: [...group.tasks, task],
    };
  }

  private updateGroupInList(groups: Task.Group[], index: number, updatedGroup: Task.Group): Task.Group[] {
    return [
      ...groups.slice(0, index),
      updatedGroup,
      ...groups.slice(index + 1),
    ];
  }

  async toggleTask(groupId: string, taskId: number): Promise<Task.Root[]> {
    await delay(200);
    const groups = await this.getTaskGroups();
    const groupIndex = this.findGroupIndex(groups, groupId);
    const group = groups[groupIndex];
    
    const taskIndex = this.findTaskIndex(group.tasks, taskId);
    const updatedTasks = this.toggleTaskCompletion(group.tasks, taskIndex);
    
    const updatedGroup = {
      ...group,
      tasks: updatedTasks,
    };
    
    const updatedGroups = this.updateGroupInList(groups, groupIndex, updatedGroup);
    this.storage.setJSON(TaskHttpService.TASK_GROUPS_KEY, updatedGroups, this.DEFAULT_STORAGE_OPTIONS as any);
    await this.checkOnboardingProgress('complete-task');
    
    return updatedTasks;
  }

  private findTaskIndex(tasks: Task.Root[], taskId: number): number {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${taskId} not found`);
    }
    return taskIndex;
  }

  private toggleTaskCompletion(tasks: Task.Root[], taskIndex: number): Task.Root[] {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      completed: !updatedTasks[taskIndex].completed,
    };
    return updatedTasks;
  }

  async deleteTask(groupId: string, taskId: number): Promise<Task.Root[]> {
    await delay(200);
    const groups = await this.getTaskGroups();
    const groupIndex = this.findGroupIndex(groups, groupId);
    const group = groups[groupIndex];
    
    const updatedTasks = group.tasks.filter(task => task.id !== taskId);
    const updatedGroup = {
      ...group,
      tasks: updatedTasks,
    };
    
    const updatedGroups = this.updateGroupInList(groups, groupIndex, updatedGroup);
    this.storage.setJSON(TaskHttpService.TASK_GROUPS_KEY, updatedGroups, this.DEFAULT_STORAGE_OPTIONS as any);
    
    return updatedTasks;
  }

  async selectTaskGroup(id: string): Promise<void> {
    await delay(200);
    this.selectedGroupStorage.set(TaskHttpService.SELECTED_GROUP_ID_KEY, id);
  }

  async getSelectedTaskGroupId(): Promise<string | undefined> {
    await delay(200);
    return this.selectedGroupStorage.get(TaskHttpService.SELECTED_GROUP_ID_KEY) || undefined;
  }

  async closeOnboarding(): Promise<void> {
    await delay(200);
    const onboarding = await this.getOnboardingState();
    
    const updatedOnboarding = {
      ...onboarding,
      showOnboarding: false,
    };
    
    this.onboardingStorage.setJSON(TaskHttpService.ONBOARDING_KEY, updatedOnboarding, this.DEFAULT_STORAGE_OPTIONS as any);
  }

  async resetOnboarding(): Promise<void> {
    await delay(200);
    const resetOnboarding = {
      showOnboarding: true,
      currentStep: 'create-group',
      completed: [],
    };
    
    this.onboardingStorage.setJSON(TaskHttpService.ONBOARDING_KEY, resetOnboarding, this.DEFAULT_STORAGE_OPTIONS as any);
  }

  async completeOnboardingStep(step: string): Promise<void> {
    await delay(200);
    const onboarding = await this.getOnboardingState();
    
    const completed = this.addStepToCompleted(onboarding.completed, step);
    const nextStep = this.determineNextStep(step);
    
    const updatedOnboarding = {
      ...onboarding,
      currentStep: nextStep,
      completed,
    };
    
    this.onboardingStorage.setJSON(TaskHttpService.ONBOARDING_KEY, updatedOnboarding, this.DEFAULT_STORAGE_OPTIONS as any);
  }

  private async getOnboardingState(): Promise<Task.OnboardingState> {
    const onboarding = this.onboardingStorage.getJSON(TaskHttpService.ONBOARDING_KEY) as Task.OnboardingState;
    return onboarding || {
      showOnboarding: true,
      currentStep: 'create-group',
      completed: []
    };
  }

  private addStepToCompleted(completed: string[], step: string): string[] {
    if (completed.includes(step)) return completed;
    return [...completed, step];
  }

  private determineNextStep(currentStep: string): string {
    const currentIndex = TaskHttpService.STEPS.indexOf(currentStep);
    
    if (currentIndex < 0 || currentIndex >= TaskHttpService.STEPS.length - 1) return currentStep;
    return TaskHttpService.STEPS[currentIndex + 1];
  }

  private async checkOnboardingProgress(step: string): Promise<void> {
    const onboarding = await this.getOnboardingState();
    if (onboarding.currentStep !== step) return;
    if (onboarding.completed.includes(step)) return;
    
    await this.completeOnboardingStep(step);
  }
}
