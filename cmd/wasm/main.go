package main

import (
	"encoding/json"
	"syscall/js"

	"github.com/chuckha/ColorFlood/internal"
)

var g *internal.Game

// args must be: seed, size
func thing(this js.Value, args []js.Value) any {
	numberOfColors := 4
	g = internal.NewGame(int64(args[0].Int()), args[1].Int(), numberOfColors)
	out, _ := json.Marshal(g)
	return string(out)
}

func apply(this js.Value, args []js.Value) any {
	if len(args) != 1 {
		return "Invalid number of arguments passed"
	}
	g.Input(args[0].Int())
	out, _ := json.Marshal(g)
	return string(out)
}

func greedySolution(this js.Value, args []js.Value) any {
	num := g.ApproximateSolution()
	return num
}

func main() {
	js.Global().Set("gameInit", js.FuncOf(thing))
	js.Global().Set("apply", js.FuncOf(apply))
	js.Global().Set("greedySolution", js.FuncOf(greedySolution))
	select {}
}
