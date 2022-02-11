package main

import (
	"fmt"

	"github.com/chuckha/ColorFlood/internal"
)

// A test binary.

func main() {
	game := internal.NewGame(0, 5, 4)

	fmt.Println(game)

	fmt.Println("max number", game.Cells.MaxNumber)
	game.ApproximateSolution()
	//	/fmt.Println(game.Cells.NeighborsMatching())
	// g := internal.GraphFromCells(game.Cells)
	// g.Combine()
	// for _, v := range g.Nodes {
	// 	fmt.Println(v)
	// }
}
