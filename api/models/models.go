package models

import (
	"errors"
	"gBeauty/security"
	"gorm.io/gorm"
	"time"
)

type BaseModel struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

type Document struct {
	BaseModel
	Name       string    `json:"name"`
	DocumentID string    `json:"documentID"`
	Date       time.Time `json:"date"`
}

type User struct {
	BaseModel
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Active   bool   `json:"active" gorm:"default:true"`
}

func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	var tu User
	err = tx.Find(&tu, u.ID).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			u.Password, err = security.EncryptPassowrd(u.Password)
			if err != nil {
				return err
			}

			return
		}
	}

	if err = security.VerifyPassword(tu.Password, u.Password); err != nil {
		u.Password, err = security.EncryptPassowrd(u.Password)
	}
	return err
}

type PeopleType struct {
	BaseModel
	Name string `json:"name"`
}

type People struct {
	BaseModel
	FirstName  string     `json:"firstName"`
	LastName   string     `json:"lastName"`
	DocumentId string     `json:"documentId"`
	Email      string     `json:"email" gorm:"unique"`
	TypeID     uint       `json:"typeID"`
	Type       PeopleType `json:"type" gorm:"foreignKey:TypeID"`
	Active     bool       `json:"active" gorm:"default:true"`
}

type Schedule struct {
	BaseModel
	PeopleID uint      `json:"peopleId"`
	People   People    `json:"people" gorm:"foreignKey:PeopleID"`
	Date     time.Time `json:"date"`
	Title    string    `json:"title"`
	Note     string    `json:"note"`
	Status   uint      `json:"status" gorm:"default:0"`
}

type Service struct {
	BaseModel
	Name     string    `json:"name"`
	Price    float32   `json:"price" gorm:"default:0"`
	Duration time.Time `json:"duration"`
}

type ProductGroup struct {
	BaseModel
	Name string `json:"name"`
}

type Product struct {
	BaseModel
	Name    string       `json:"name"`
	Price   float32      `json:"price"`
	GroupID uint         `json:"groupID"`
	Group   ProductGroup `json:"group" gorm:"foreignKey:GroupID"`
	Active  bool         `json:"active" gorm:"default:true"`
}

type Treatment struct {
	BaseModel
	Date           time.Time `json:"date"`
	CustomerID     uint      `json:"customerID"`
	Customer       People    `json:"customer" gorm:"foreignKey:CustomerID"`
	ProfessionalID uint      `json:"professionalID"`
	Professional   People    `json:"professional" gorm:"foreignKey:ProfessionalID"`
	Duration       time.Time `json:"duration"`
	ScheduleID     uint      `json:"scheduleID"`
	Schedule       *Schedule `json:"schedule" gorm:"foreignKey:ID"`
	Status         uint      `json:"status" gorm:"default:0"`
	Cost           *float32  `json:"cost" gorm:"default:0"`
	Value          *float32  `json:"value" gorm:"default:0"`
	Tip            *float32  `json:"tip" gorm:"default:0"`
}

type TreatmentItem struct {
	BaseModel
	TreatmentID uint      `json:"treatmentID"`
	Treatment   Treatment `json:"treatment" gorm:"foreignKey:TreatmentID"`
	ProductID   uint      `json:"productID"`
	Product     *Product  `json:"product" gorm:"foreignKey:ProductID"`
	ServiceID   uint      `json:"serviceID"`
	Service     *Service  `json:"service" gorm:"foreignKey:ServiceID"`
	Amount      float32   `json:"amount"`
	Cost        float32   `json:"cost"`
	Discount    float32   `json:"discount"`
}
