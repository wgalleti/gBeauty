package base

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Route interface {
	Install(app *fiber.App)
}

type route struct {
	name       string
	model      interface{}
	controller Controller
}

func NewRoute(name string, db *gorm.DB, model interface{}) Route {
	ctr := NewController(db, model)
	return &route{name, model, ctr}
}

func (r *route) Install(app *fiber.App) {
	url, urlId := fmt.Sprintf("api/v1/%s", r.name), fmt.Sprintf("api/v1/%s/:id", r.name)
	app.Get(url, r.controller.List)
	app.Get(urlId, r.controller.Get)
	app.Post(url, r.controller.Create)
	app.Put(urlId, r.controller.Update)
	app.Delete(urlId, r.controller.Delete)
}
