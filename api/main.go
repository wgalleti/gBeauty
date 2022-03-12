package main

import (
	"gBeauty/base"
	"gBeauty/config"
	"gBeauty/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"log"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Panicln(err)
	}
}

func main() {
	db := config.NewDatabase()
	db.Install()
	defer db.Close()

	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New())

	app.Static("/", "./public")
	base.NewRoute("users", db.DB(), models.User{}).Install(app)
	base.NewRoute("types", db.DB(), models.PeopleType{}).Install(app)
	base.NewRoute("peoples", db.DB(), models.People{}).Install(app)
	base.NewRoute("schedules", db.DB(), models.Schedule{}).Install(app)
	base.NewRoute("services", db.DB(), models.Service{}).Install(app)
	base.NewRoute("groups", db.DB(), models.ProductGroup{}).Install(app)
	base.NewRoute("products", db.DB(), models.Product{}).Install(app)
	base.NewRoute("treatments", db.DB(), models.Treatment{}).Install(app)
	base.NewRoute("items", db.DB(), models.TreatmentItem{}).Install(app)
	base.NewRoute("documents", db.DB(), models.Document{}).Install(app)

	log.Fatal(app.Listen(":8080"))
}
