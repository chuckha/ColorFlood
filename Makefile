wasm:
	GOOS=js GOARCH=wasm go build -o  game.wasm ./cmd/wasm/main.go