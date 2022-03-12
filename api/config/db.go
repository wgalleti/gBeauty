package config

import (
	"fmt"
	"gBeauty/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
	"strconv"
)

type Database interface {
	DB() *gorm.DB
	Close()
	Install()
}

type database struct {
	db *gorm.DB
}

func NewDatabase() Database {
	var db database
	var err error
	dsn := getURL()
	db.db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	return &db
}

func (d *database) DB() *gorm.DB {
	return d.db
}

func (d *database) Close() {
	db, err := d.db.DB()

	if err != nil {
		log.Fatalln(err)
	}
	db.Close()
}

func (d *database) Install() {
	d.db.AutoMigrate(models.User{})
	d.db.AutoMigrate(models.PeopleType{})
	d.db.AutoMigrate(models.People{})
	d.db.AutoMigrate(models.Schedule{})
	d.db.AutoMigrate(models.Service{})
	d.db.AutoMigrate(models.ProductGroup{})
	d.db.AutoMigrate(models.Product{})
	d.db.AutoMigrate(models.Treatment{})
	d.db.AutoMigrate(models.TreatmentItem{})
	d.db.AutoMigrate(models.Document{})

	fmt.Println("Instalou")
	var types []models.PeopleType
	err := d.db.Find(&types).Error

	if err != nil {
		log.Fatalln(err)
	}

	if len(types) == 0 {

		var types = []models.PeopleType{
			{Name: "Customers"},
			{Name: "Professionals"},
			{Name: "Models"},
			{Name: "Guests"},
		}

		d.db.Create(&types)
	}
}

func getURL() string {
	port, err := strconv.Atoi(os.Getenv("DATABASE_PORT"))

	if err != nil {
		port = 5432
	}

	return fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%d sslmode=%s TimeZone=%s",
		os.Getenv("DATABASE_HOST"),
		os.Getenv("DATABASE_USER"),
		os.Getenv("DATABASE_PWD"),
		os.Getenv("DATABASE_NAME"),
		port,
		os.Getenv("DATABASE_SSL"),
		os.Getenv("DATABASE_TIMEZONE"),
	)
}
