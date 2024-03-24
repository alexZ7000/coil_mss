export enum ProjectStatusEnum {
    TO_START, //When is not open to apply.
    ACTIVE, //When is active and you student can apply.
    ON_HOLD, //When active but not open to apply because of some problems, etc.
    WAITING_FOR_RESULTS, //When closed to apply but results are not done.
    ENDED, //When is closed to apply and results are out.
    CANCELED, //When project is canceled, meaning it will not be happening.
    NEEDS_MORE_DATA //When project is missing some data to be active.
}