export interface IAdLib {
  prompt: string;
  text: string;
  numberOfLikes?: number;
  numberOfDislikes?: number;
  numberOfSaves?: number;
  isHidden?: boolean;
  isPG?: boolean;
  createdBy?: string;
}
