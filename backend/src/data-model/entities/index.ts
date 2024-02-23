import { AdlibResponseQuestion } from './adlib-response-question.entity';
import { AdlibResponse } from './adlib-response.entity';
import { Adlib } from './adlib.entity';
import { Category } from './category.entity';
import { GameSession } from './multiplayer/game-session.entity';
import { Lobby } from './multiplayer/lobby.entity';
import { Round } from './multiplayer/round.entity';
import { Submission } from './multiplayer/submission.entity';
import { User } from './multiplayer/user.entity';

const entities = [
  Adlib,
  Category,
  AdlibResponse,
  AdlibResponseQuestion,
  GameSession,
  Lobby,
  Round,
  User,
  Submission,
];

export {
  Adlib,
  Category,
  AdlibResponse,
  AdlibResponseQuestion,
  GameSession,
  Lobby,
  Round,
  User,
  Submission,
};

export default entities;
