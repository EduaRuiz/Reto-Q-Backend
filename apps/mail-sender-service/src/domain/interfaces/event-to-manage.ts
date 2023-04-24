export interface IEventToManage {
  test: {
    _id?: string;
    user_id: string;
    token: string;
    level: string;
    created_at: Date;
    started_at?: Date;
    questions: {
      question: {
        _id?: string;
        topic: string;
        level: string;
        type: string;
        sentence: string;
        options: string[];
        answer: string[];
      };
      points: number;
      answered: boolean;
    }[];
  };
  userEmail: string;
}
