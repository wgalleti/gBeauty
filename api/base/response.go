package base

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
)

type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Status  int         `json:"status"`
	Message string      `json:"message"`
}

func Send(data interface{}, err error, ctx *fiber.Ctx) error {
	var r Response
	r.Data = data

	if err != nil {
		r.Success = false
		r.Status = http.StatusBadRequest
		r.Message = err.Error()
		r.Data = nil

		ctx.Status(r.Status).JSON(r)
		return nil
	}

	r.Success = true
	r.Status = http.StatusOK
	r.Message = "request made successfully"

	ctx.Status(http.StatusOK).JSON(r)
	return nil
}
