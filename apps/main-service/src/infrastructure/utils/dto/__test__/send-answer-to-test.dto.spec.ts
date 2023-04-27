
import { validate } from "class-validator";
import { SendAnswerToTestDto } from "../send-answer-to-test.dto";

describe("SendAnswerToTestDto", () => {
    it("should validate successfully", async () => {
        const dto = new SendAnswerToTestDto();
        dto.token = "abc123";
        dto.questionSentence = "What is the capital of France?";
        dto.answer = ["Paris"];

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it("should fail validation when required properties are missing", async () => {
        const dto = new SendAnswerToTestDto();
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it("should fail validation when answer is empty", async () => {
        const dto = new SendAnswerToTestDto();
        dto.token = "abc123";
        dto.questionSentence = "What is the capital of France?";
        dto.answer = [];

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty("arrayMinSize");
    });

    it("should fail validation when answer contains empty strings", async () => {
        const dto = new SendAnswerToTestDto();
        dto.token = "abc123";
        dto.questionSentence = "What is the capital of France?";
        dto.answer = ["", ""];

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty("isNotEmpty");
    });
});