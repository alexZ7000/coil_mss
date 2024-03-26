import { Criteria } from "../entities/criteria";

export class CriteriaMock {
    public criterias: Criteria[];

    constructor() {
        this.criterias = [
            new Criteria(
                {
                    id: "365556ad-69d2-43cd-b98c-287bf7606fba",
                    criteria: "Knows how to never give you up"
                },
            ),
            new Criteria(
                {
                    id: "2c7e1cbb-fff5-4572-998e-283381537512",
                    criteria: "Knows how to never let you down"
                }
            ),
            new Criteria(
                {
                    id: "6033c5ca-1401-426f-b2b6-d2a08d144633",
                    criteria: "Knows how to never run around and desert you"
                }
            ),
            new Criteria(
                {
                    id: "6033c5ca-1401-426f-b2b6-d2a08d144633",
                    criteria: "Knows how to never make you cry"
                }
            ),
            new Criteria(
                {
                    id: "6033c5ca-1401-426f-b2b6-d2a08d144633",
                    criteria: "Knows how to never say goodbye"
                }
            ),
            new Criteria(
                {
                    id: "6033c5ca-1401-426f-b2b6-d2a08d144633",
                    criteria: "Knows how to never tell a lie"
                }
            ),
            new Criteria(
                {
                    id: "6033c5ca-1401-426f-b2b6-d2a08d144633",
                    criteria: "Knows how to never hurt you"
                }
            )
        ];                
    }
}