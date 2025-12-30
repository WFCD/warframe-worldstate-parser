export interface KuvaLogEntry {
  start: string;
  end: string;
  missiontype?: string;
  solnode: string;
  solnodedata?: SolnodeData;
  realtime?: string;
}

export interface SolnodeData {
  name: string;
  tile: string;
  planet: string;
  enemy: string;
  type: string;
  node_type: string;
  archwing: boolean;
  sharkwing: boolean;
}
