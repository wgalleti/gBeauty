package base

import (
	"gorm.io/gorm"
	"reflect"
	"testing"
)

func TestNewRepository(t *testing.T) {
	type args struct {
		db    *gorm.DB
		model interface{}
	}
	tests := []struct {
		name string
		args args
		want Repository
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewRepository(tt.args.db, tt.args.model); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewRepository() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_repository_Delete(t *testing.T) {
	type fields struct {
		db    *gorm.DB
		model interface{}
	}
	type args struct {
		pk uint
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
			r := &repository{
				db:    tt.fields.db,
				model: tt.fields.model,
			}
			if err := r.Delete(tt.args.pk); (err != nil) != tt.wantErr {
				t.Errorf("Delete() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_repository_Get(t *testing.T) {
	type fields struct {
		db    *gorm.DB
		model interface{}
	}
	type args struct {
		pk uint
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    interface{}
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &repository{
				db:    tt.fields.db,
				model: tt.fields.model,
			}
			got, err := r.Get(tt.args.pk)
			if (err != nil) != tt.wantErr {
				t.Errorf("Get() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Get() got = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_repository_Insert(t *testing.T) {
	type fields struct {
		db    *gorm.DB
		model interface{}
	}
	type args struct {
		data interface{}
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    interface{}
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &repository{
				db:    tt.fields.db,
				model: tt.fields.model,
			}
			got, err := r.Insert(tt.args.data)
			if (err != nil) != tt.wantErr {
				t.Errorf("Insert() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Insert() got = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_repository_List(t *testing.T) {
	type fields struct {
		db    *gorm.DB
		model interface{}
	}
	tests := []struct {
		name    string
		fields  fields
		want    RepositoryList
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &repository{
				db:    tt.fields.db,
				model: tt.fields.model,
			}
			got, err := r.List()
			if (err != nil) != tt.wantErr {
				t.Errorf("List() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("List() got = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_repository_Update(t *testing.T) {
	type fields struct {
		db    *gorm.DB
		model interface{}
	}
	type args struct {
		pk   uint
		data interface{}
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    interface{}
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &repository{
				db:    tt.fields.db,
				model: tt.fields.model,
			}
			got, err := r.Update(tt.args.pk, tt.args.data)
			if (err != nil) != tt.wantErr {
				t.Errorf("Update() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Update() got = %v, want %v", got, tt.want)
			}
		})
	}
}
