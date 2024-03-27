import { Criteria } from "../entities/Criteria";


export class CriteriaMock {
    public criterias: Criteria[];

    constructor() {
        this.criterias = [
            new Criteria(
                {
                    id: 1,
                    criteria: "Knows how to never give you up"
                },
            ),
            new Criteria(
                {
                    id: 2,
                    criteria: "Knows how to never let you down"
                }
            ),
            new Criteria(
                {
                    id: 3,
                    criteria: "Knows how to never run around and desert you"
                }
            ),
            new Criteria(
                {
                    id: 4,
                    criteria: "Knows how to never make you cry"
                }
            ),
            new Criteria(
                {
                    id: 5,
                    criteria: "Knows how to never say goodbye"
                }
            ),
            new Criteria(
                {
                    id: 6,
                    criteria: "Knows how to never tell a lie"
                }
            ),
            new Criteria(
                {
                    id: 7,
                    criteria: "Knows how to never hurt you"
                }
            )
        ];                
    }
}