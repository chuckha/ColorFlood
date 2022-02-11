package internal

import (
	"fmt"
	"math"
	"strings"
)

type Cells struct {
	Max       Point
	Data      map[Point]int
	MaxNumber int
}

type randomizer interface {
	Next() int
	MaxNumber() int
}

func NewCells(size int, r randomizer) *Cells {
	c := &Cells{
		Max:       Point{size, size},
		Data:      make(map[Point]int),
		MaxNumber: r.MaxNumber(),
	}
	c.ReadOrder(func(p Point) {
		c.Data[p] = r.Next()
	})
	return c
}

func (c *Cells) ReadOrder(fn func(Point)) {
	for j := 0; j <= c.Max.Y; j++ {
		for i := 0; i <= c.Max.X; i++ {
			fn(Point{i, j})
		}
	}
}

/// neighbors matching starts at the top left and adds every neighbor that is its own color
// each neighbor gets pulled off the queue, checked to see if it's neighbor has been visisted and is a different color
//
func (c *Cells) NeighborsMatching() map[int]int {
	out := make(map[int]int)
	q := NewQueue[Point]()
	initColor := c.Data[Point{0, 0}]
	q.Enqueue(Point{0, 0})
	visited := make(map[Point]bool)
	for q.Size() > 0 {
		cur := q.Dequeue()
		if _, ok := visited[cur]; ok {
			continue
		}
		for _, n := range cur.Neighbors() {
			if _, ok := visited[n]; ok {
				continue
			}
			if _, ok := c.Data[n]; !ok {
				continue
			}
			if c.Data[n] == initColor {
				q.Enqueue(n)
				continue
			}
			out[c.Data[n]]++
			visited[n] = true
		}
		visited[cur] = true
	}
	counts := make(map[int]int)
	fn := func(p Point) {
		counts[c.Data[p]]++
	}
	c.ReadOrder(fn)
	for k, v := range out {
		if counts[k] == v {
			out[k] = math.MaxInt
		}
	}
	return out
}

func (c *Cells) String() string {
	var out strings.Builder
	for j := 0; j <= c.Max.Y; j++ {
		for i := 0; i <= c.Max.X; i++ {
			out.WriteString(fmt.Sprintf("%d", c.Data[Point{i, j}]))
		}
		out.WriteString("\n")
	}
	return out.String()
}

func (c *Cells) Apply(history []int) *Cells {
	out := c.copy()
	for _, h := range history {
		apply(out.Data, h)
	}
	return out
}

func (c *Cells) Done() bool {
	color := c.Data[Point{0, 0}]
	for j := 0; j <= c.Max.Y; j++ {
		for i := 0; i <= c.Max.X; i++ {
			if c.Data[Point{i, j}] != color {
				return false
			}
		}
	}
	return true
}

func (c *Cells) copy() *Cells {
	out := &Cells{
		Max:       c.Max,
		Data:      make(map[Point]int),
		MaxNumber: c.MaxNumber,
	}
	for k, v := range c.Data {
		out.Data[k] = v
	}
	return out
}

func apply(data map[Point]int, val int) {
	q := NewQueue[Point]()
	q.Enqueue(Point{0, 0})
	visited := make(map[Point]bool)
	start := data[Point{0, 0}]
	for q.Size() > 0 {
		cur := q.Dequeue()
		if data[cur] == start {
			data[cur] = val
			for _, n := range cur.Neighbors() {
				if visited[n] {
					continue
				}
				if _, ok := data[n]; !ok {
					continue
				}
				q.Enqueue(n)
			}
		}
		visited[cur] = true
	}
}

type Graph struct {
	Nodes map[Point]*node
}

func GraphFromCells(cells *Cells) *Graph {
	out := &Graph{Nodes: map[Point]*node{}}
	for p, i := range cells.Data {
		// if the node already exists, use it
		cur, ok := out.Nodes[p]
		if !ok {
			cur = &node{point: p, num: i, neighbors: make(map[Point]*node)}
			out.Nodes[p] = cur
		}
		for _, p2 := range p.Neighbors() {
			if _, ok := cells.Data[p2]; !ok {
				continue
			}
			nabe, ok := out.Nodes[p2]
			if !ok {
				nabe = &node{point: p2, num: cells.Data[p2], neighbors: map[Point]*node{cur.point: cur}}
				out.Nodes[p2] = nabe
			}
			cur.neighbors[p2] = nabe
		}
	}
	return out
}

func (g *Graph) Combine() {
	for _, node := range g.Nodes {
		for p, n := range node.neighbors {
			if n.num == node.num {
				node.combine(n)
				delete(g.Nodes, p)
			}
		}
	}
}

type node struct {
	point     Point
	num       int
	neighbors map[Point]*node
}

func (n *node) combine(n2 *node) {
	for k, v := range n2.neighbors {
		n.neighbors[k] = v
	}
	delete(n.neighbors, n2.point)
}

func (n *node) String() string {
	nabeNums := []int{}
	for _, n2 := range n.neighbors {
		nabeNums = append(nabeNums, n2.num)
	}
	return fmt.Sprintf("(%d) %v -> %v", n.num, n.point, nabeNums)
}
