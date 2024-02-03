import { AdlibResponseQuestion } from 'src/data-model/entities';

export class AdlibResponseValidator {
  public static validateQuestions(questions: AdlibResponseQuestion[]): boolean {
    for (const question of questions) {
      if (!question.answer) {
        return false;
      }
      if (question.answer.length > 100) {
        return false;
      }
    }
    return true;
  }
}
