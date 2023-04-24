import { QuestionDomainModel } from '@main-service/domain/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomQuestionService {
  public generate(questions: QuestionDomainModel[]): QuestionDomainModel[] {
    const groupsByTypeAndTopic = this.groupByTypeAndTopic(questions);

    const selectedQuestions: QuestionDomainModel[] = [];
    const topicCounts = new Map<string, number>();
    const typeCounts = new Map<string, number>();

    for (const [topic, typeGroups] of groupsByTypeAndTopic) {
      const topicCount = Math.min(3, typeGroups.size);
      let typesSelected = new Set<string>();

      for (let i = 0; i < topicCount; i++) {
        let typeIndex = Math.floor(Math.random() * typeGroups.size);
        let type = Array.from(typeGroups.keys())[typeIndex];

        // If type already selected for this topic, try again
        while (typesSelected.has(type)) {
          typeIndex = (typeIndex + 1) % typeGroups.size;
          type = Array.from(typeGroups.keys())[typeIndex];
        }

        typesSelected.add(type);
        const group = typeGroups.get(type);
        const randomQuestions = this.selectRandom(group, 1, selectedQuestions);
        selectedQuestions.push(...randomQuestions);

        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
        typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
      }
    }

    const remaining = 15 - selectedQuestions.length;
    if (remaining > 0) {
      const randomQuestions = this.selectRandom(
        questions,
        remaining,
        selectedQuestions,
      );
      selectedQuestions.push(...randomQuestions);
    }

    return selectedQuestions;
  }

  private groupByType(
    questions: QuestionDomainModel[],
  ): Map<string, QuestionDomainModel[]> {
    const groups = new Map<string, QuestionDomainModel[]>();
    for (const question of questions) {
      const type = question.type;
      let group = groups.get(type);
      if (!group) {
        group = [];
        groups.set(type, group);
      }
      group.push(question);
    }
    return groups;
  }

  private groupByTopic(
    questions: QuestionDomainModel[],
  ): Map<string, QuestionDomainModel[]> {
    const groups = new Map<string, QuestionDomainModel[]>();
    for (const question of questions) {
      const topic = question.topic;
      let group = groups.get(topic);
      if (!group) {
        group = [];
        groups.set(topic, group);
      }
      group.push(question);
    }
    return groups;
  }

  private groupByTypeAndTopic(
    questions: QuestionDomainModel[],
  ): Map<string, Map<string, QuestionDomainModel[]>> {
    const groups = new Map<string, Map<string, QuestionDomainModel[]>>();
    for (const question of questions) {
      const type = question.type;
      const topic = question.topic;
      let topicGroups = groups.get(topic);
      if (!topicGroups) {
        topicGroups = new Map<string, QuestionDomainModel[]>();
        groups.set(topic, topicGroups);
      }
      let typeGroup = topicGroups.get(type);
      if (!typeGroup) {
        typeGroup = [];
        topicGroups.set(type, typeGroup);
      }
      typeGroup.push(question);
    }
    return groups;
  }

  private selectRandom(
    questions: QuestionDomainModel[],
    num: number,
    excludedQuestions: QuestionDomainModel[],
  ): QuestionDomainModel[] {
    const candidateQuestions = questions.filter(
      (q) => !excludedQuestions.includes(q),
    );
    const randomQuestions = [];
    for (let i = 0; i < num; i++) {
      const index = Math.floor(Math.random() * candidateQuestions.length);
      const question = candidateQuestions.splice(index, 1)[0];
      randomQuestions.push(question);
    }
    return randomQuestions;
  }
}
