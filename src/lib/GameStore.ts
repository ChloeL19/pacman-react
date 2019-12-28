import { configure, observable, action, computed } from "mobx";

import { GhostPhase } from "../components/Ghost";
import { Direction, SPEED } from "../components/Types";
import { PacManStore } from "./PacManStore";
import { setTileCoordinates } from "./MazeObject";
import { screenCoordinateFromTileCoordinate } from "./Coordinates";

configure({ enforceActions: "observed" });

export class GhostStore {
  @observable
  timestamp = 0;

  ghostNumber = 0;

  color = "ghost color";

  @observable
  x = 16;

  minX = 16;
  maxX = 17 * 16;

  @observable
  y = 16;

  minY = 16;
  maxY = 17 * 16;

  @observable
  vx = SPEED;

  @observable
  vy = 0;

  @computed
  get phase(): GhostPhase {
    return Math.round((this.timestamp + this.ghostNumber * 100) / 300) % 2 === 0
      ? 0
      : 1;
  }

  @computed
  get direction(): Direction {
    if (this.vx > 0) {
      return "RIGHT";
    }
    if (this.vx < 0) {
      return "LEFT";
    }
    if (this.vy > 0) {
      return "DOWN";
    }
    return "UP";
  }
}

export class GameStore {
  constructor() {
    // this.pacMan =
    this.ghosts[0].ghostNumber = 0;
    this.ghosts[0].color = "red";
    this.ghosts[0].vx = SPEED;
    this.ghosts[0].vy = 0;
    this.ghosts[0].minX = screenCoordinateFromTileCoordinate(1);
    this.ghosts[0].maxX = screenCoordinateFromTileCoordinate(26);
    this.ghosts[0].minY = screenCoordinateFromTileCoordinate(1);
    this.ghosts[0].maxY = screenCoordinateFromTileCoordinate(30);
    this.ghosts[0].x = screenCoordinateFromTileCoordinate(1);
    this.ghosts[0].y = screenCoordinateFromTileCoordinate(29);

    this.ghosts[1].ghostNumber = 1;
    this.ghosts[1].color = "pink";
    this.ghosts[1].vx = SPEED;
    this.ghosts[1].vy = 0;
    this.ghosts[1].minX = screenCoordinateFromTileCoordinate(15);
    this.ghosts[1].maxX = screenCoordinateFromTileCoordinate(26);
    this.ghosts[1].minY = screenCoordinateFromTileCoordinate(1);
    this.ghosts[1].maxY = screenCoordinateFromTileCoordinate(29);
    this.ghosts[1].x = screenCoordinateFromTileCoordinate(31);
    this.ghosts[1].y = screenCoordinateFromTileCoordinate(20);

    this.ghosts[2].ghostNumber = 2;
    this.ghosts[2].color = "cyan";
    this.ghosts[2].maxX = 800;
    this.ghosts[2].minX = 16;
    this.ghosts[2].minY = 20;
    this.ghosts[2].maxY = 39 * 16;
    this.ghosts[2].vx = 0;
    this.ghosts[2].vy = SPEED;
    this.ghosts[2].minX = screenCoordinateFromTileCoordinate(1);
    this.ghosts[2].maxX = screenCoordinateFromTileCoordinate(30);
    this.ghosts[2].minY = screenCoordinateFromTileCoordinate(17);
    this.ghosts[2].maxY = screenCoordinateFromTileCoordinate(26);
    this.ghosts[2].x = screenCoordinateFromTileCoordinate(21);
    this.ghosts[2].y = screenCoordinateFromTileCoordinate(23);

    this.ghosts[3].ghostNumber = 3;
    this.ghosts[3].color = "orange";
    this.ghosts[3].minX = screenCoordinateFromTileCoordinate(1);
    this.ghosts[3].maxX = screenCoordinateFromTileCoordinate(26);
    this.ghosts[3].minY = screenCoordinateFromTileCoordinate(1);
    this.ghosts[3].maxY = screenCoordinateFromTileCoordinate(30);
    this.ghosts[3].x = screenCoordinateFromTileCoordinate(7);
    this.ghosts[3].y = screenCoordinateFromTileCoordinate(5);
    this.ghosts[3].vx = SPEED;
    this.ghosts[3].vy = 0;
  }

  @observable
  gameRunning = true;

  ghosts = [
    new GhostStore(),
    new GhostStore(),
    new GhostStore(),
    new GhostStore()
  ];

  pacMan = new PacManStore();

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pacMan.setPressedKey(pressedKey);
  }

  @action.bound
  stopGame() {
    this.gameRunning = false;
  }
}