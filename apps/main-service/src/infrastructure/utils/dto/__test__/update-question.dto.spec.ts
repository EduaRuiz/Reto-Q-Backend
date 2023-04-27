
import { validate } from "class-validator";
import { UpdateQuestionDto } from "../update-question.dto";

describe("UpdateQuestionDto", () => {
    it("should pass validation when all properties are valid", async () => {
        const dto = new UpdateQuestionDto();
        dto.topic = "topic";
        dto.level = "1";
        dto.type = "unique";
        dto.sentence = "sentence";
        dto.options = ["option 1", "option 2", "option 3"];
        dto.answer = ["option 1"];

        const errors = await validate(dto);
        expect(errors.length).toEqual(0);
    });
    

    it("should fail validation when a property is of an invalid type", async () => {
        const dto = new UpdateQuestionDto();
        // invalid type for level
        dto.level = "4";
        dto.type = "unique";
        dto.sentence = "sentence";
        dto.options = ["option 1", "option 2", "option 3"];
        dto.answer = ["option 1"];

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it("should fail validation when an array property is empty", async () => {
        const dto = new UpdateQuestionDto();
        dto.topic = "topic";
        dto.level = "1";
        dto.type = "unique";
        dto.sentence = "sentence";
        // empty options array
        dto.options = [];
        dto.answer = ["option 1"];

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});