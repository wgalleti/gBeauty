package base

import (
	"reflect"

	"gorm.io/gorm"
)

type RepositoryList struct {
	Rows  interface{} `json:"rows"`
	Count uint        `json:"count"`
	Error error       `json:"error"`
}

type RepositoryObject struct {
	Row   interface{} `json:"row"`
	Error error       `json:"error"`
}

type Repository interface {
	List() (RepositoryList, error)
	Get(pk uint) (interface{}, error)
	Insert(data interface{}) (interface{}, error)
	Update(pk uint, data interface{}) (interface{}, error)
	Delete(pk uint) error
}

type repository struct {
	db    *gorm.DB
	model interface{}
}

func NewRepository(db *gorm.DB, model interface{}) Repository {
	return &repository{db, model}
}

func (r *repository) List() (RepositoryList, error) {
	model := reflect.New(reflect.TypeOf(r.model)).Interface()
	modelType := reflect.TypeOf(model)
	rows := reflect.New(reflect.SliceOf(modelType)).Elem().Interface()
	result := r.db.Model(model).Find(&rows)
	if rows == nil {
		rows = make([]interface{}, 0)
	}

	return RepositoryList{
		Rows:  rows,
		Count: uint(result.RowsAffected),
		Error: result.Error,
	}, result.Error
}

func (r *repository) Get(pk uint) (interface{}, error) {
	model := reflect.New(reflect.TypeOf(r.model)).Interface()
	row := reflect.New(reflect.TypeOf(r.model)).Interface()
	result := r.db.Model(model).First(&row, pk)
	return RepositoryObject{
		Row:   row,
		Error: result.Error,
	}, result.Error
}

func (r *repository) Insert(data interface{}) (interface{}, error) {
	model := reflect.New(reflect.TypeOf(r.model)).Interface()
	result := r.db.Model(model).Create(data)
	return RepositoryObject{
		Row:   data,
		Error: result.Error,
	}, result.Error
}

func (r *repository) Update(pk uint, data interface{}) (interface{}, error) {
	model := reflect.New(reflect.TypeOf(r.model)).Interface()
	row := reflect.New(reflect.TypeOf(r.model)).Interface()
	result := r.db.Model(model).Find(&row, pk).Updates(data)

	reg, err := r.Get(pk)
	if err != nil {
		return nil, err
	}
	return RepositoryObject{
		Row:   reg,
		Error: result.Error,
	}, result.Error

}
func (r *repository) Delete(pk uint) error {
	model := reflect.New(reflect.TypeOf(r.model)).Interface()
	return r.db.Model(model).Delete(&model, pk).Error
}
