package base

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"reflect"
	"testing"
)

func TestNewController(t *testing.T) {
	type args struct {
		db    *gorm.DB
		model interface{}
	}
	tests := []struct {
		name string
		args args
		want Controller
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewController(tt.args.db, tt.args.model); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewController() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_controller_Create(t *testing.T) {
	type fields struct {
		repo  Repository
		model interface{}
	}
	type args struct {
		ctx *fiber.Ctx
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &controller{
				repo:  tt.fields.repo,
				model: tt.fields.model,
			}
			if err := c.Create(tt.args.ctx); (err != nil) != tt.wantErr {
				t.Errorf("Create() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_controller_Delete(t *testing.T) {
	type fields struct {
		repo  Repository
		model interface{}
	}
	type args struct {
		ctx *fiber.Ctx
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &controller{
				repo:  tt.fields.repo,
				model: tt.fields.model,
			}
			if err := c.Delete(tt.args.ctx); (err != nil) != tt.wantErr {
				t.Errorf("Delete() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_controller_Get(t *testing.T) {
	type fields struct {
		repo  Repository
		model interface{}
	}
	type args struct {
		ctx *fiber.Ctx
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &controller{
				repo:  tt.fields.repo,
				model: tt.fields.model,
			}
			if err := c.Get(tt.args.ctx); (err != nil) != tt.wantErr {
				t.Errorf("Get() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_controller_List(t *testing.T) {
	type fields struct {
		repo  Repository
		model interface{}
	}
	type args struct {
		ctx *fiber.Ctx
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &controller{
				repo:  tt.fields.repo,
				model: tt.fields.model,
			}
			if err := c.List(tt.args.ctx); (err != nil) != tt.wantErr {
				t.Errorf("List() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_controller_Update(t *testing.T) {
	type fields struct {
		repo  Repository
		model interface{}
	}
	type args struct {
		ctx *fiber.Ctx
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &controller{
				repo:  tt.fields.repo,
				model: tt.fields.model,
			}
			if err := c.Update(tt.args.ctx); (err != nil) != tt.wantErr {
				t.Errorf("Update() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
