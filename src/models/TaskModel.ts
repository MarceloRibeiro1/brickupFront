export interface TaskModel {
	id: number;
	task: string;
	status: "Pendente" | "Finalizada";
	description: string;
	picture: string | null;
}
