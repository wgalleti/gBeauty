package base

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"reflect"
	"testing"
)

func TestNewRoute(t *testing.T) {
	type args struct {
		name  string
		db    *gorm.DB
		model interface{}
	}
	tests := []struct {
		name string
		args args
		want Route
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewRoute(tt.args.name, tt.args.db, tt.args.model); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewRoute() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_route_Install(t *testing.T) {
	type fields struct {
		name       string
		model      interface{}
		controller Controller
	}
	type args struct {
		app *fiber.App
	}
	tests := []struct {
		name   string
		fields fields
		args   args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &route{
				name:       tt.fields.name,
				model:      tt.fields.model,
				controller: tt.fields.controller,
			}
			r.Install(tt.args.app)
		})
	}
}
