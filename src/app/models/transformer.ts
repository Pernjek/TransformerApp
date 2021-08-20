import { VehicleType } from "./vehicleType";

export type Status = "OK" | "INJURED" | "MIA"
export interface Transformer {
    id: number;
    name: string;
    status: Status;
    vehicleType: string;
    vehicleGroup: string;
    vehicleModel: string;
    gear: string[];
}