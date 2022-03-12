package base

import (
	"github.com/gofiber/fiber/v2"
	"testing"
)

func TestSend(t *testing.T) {
	type args struct {
		data interface{}
		err  error
		ctx  *fiber.Ctx
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := Send(tt.args.data, tt.args.err, tt.args.ctx); (err != nil) != tt.wantErr {
				t.Errorf("Send() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
