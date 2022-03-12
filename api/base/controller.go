package base

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"reflect"
)

type Controller interface {
	List(ctx *fiber.Ctx) error
	Get(ctx *fiber.Ctx) error
	Create(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
}

type controller struct {
	repo  Repository
	model interface{}
}

func NewController(db *gorm.DB, model interface{}) Controller {
	r := NewRepository(db, model)
	return &controller{r, model}
}

func (c *controller) List(ctx *fiber.Ctx) error {
	list, err := c.repo.List()
	return Send(list, err, ctx)
}

func (c *controller) Get(ctx *fiber.Ctx) error {
	pk, err := ctx.ParamsInt("id")
	if err != nil {
		return Send(nil, err, ctx)
	}
	list, err := c.repo.Get(uint(pk))
	return Send(list, err, ctx)
}
func (c *controller) Create(ctx *fiber.Ctx) error {
	data := reflect.New(reflect.TypeOf(c.model)).Interface()
	if err := ctx.BodyParser(&data); err != nil {
		return Send(nil, err, ctx)
	}
	fmt.Println(data)
	result, err := c.repo.Insert(data)
	return Send(result, err, ctx)
}
func (c *controller) Update(ctx *fiber.Ctx) error {
	pk, err := ctx.ParamsInt("id")
	if err != nil {
		return Send(nil, err, ctx)
	}

	data := reflect.New(reflect.TypeOf(c.model)).Interface()
	if err := ctx.BodyParser(data); err != nil {
		return Send(nil, err, ctx)
	}
	result, err := c.repo.Update(uint(pk), data)
	return Send(result, err, ctx)
}
func (c *controller) Delete(ctx *fiber.Ctx) error {
	pk, err := ctx.ParamsInt("id")
	if err != nil {
		return Send(nil, err, ctx)
	}
	err = c.repo.Delete(uint(pk))
	return Send(nil, err, ctx)
}
