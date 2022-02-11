package internal

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"
)

type Game struct {
	Seed  int64
	State *State

	Cells *Cells
}

func NewGame(seed int64, size, maxCellNumber int) *Game {
	g := NewGenerator(WithSeed(seed), WithRange(maxCellNumber))
	cells := NewCells(size, g)
	return &Game{
		Seed:  seed,
		State: NewState(),
		Cells: cells,
	}
}

func (g *Game) Input(i int) {
	g.State.History = append(g.State.History, i)
	g.Cells = g.Cells.Apply([]int{i})
}

func (g *Game) String() string {
	var out strings.Builder
	out.WriteString(fmt.Sprintf("%v\n\n", g.Cells))
	return out.String()
}

func (g *Game) MarshalJSON() ([]byte, error) {
	cells := make([][]int, g.Cells.Max.Y+1)
	for j := 0; j <= g.Cells.Max.Y; j++ {
		for i := 0; i <= g.Cells.Max.X; i++ {
			cells[j] = append(cells[j], g.Cells.Data[Point{i, j}])
		}
	}
	out := struct {
		History []int
		Cells   [][]int
	}{
		History: g.State.History,
		Cells:   cells,
	}
	return json.Marshal(out)
}

func (g *Game) ApproximateSolution() int {
	q := newPQ()
	for n, m := range g.Cells.NeighborsMatching() {
		q.Push(&cellData{
			nums:     []int{n},
			priority: m,
		})
	}
	for q.Size() > 0 {
		cur := q.Pull()
		//		fmt.Println(cur)
		applied := g.Cells.Apply(cur)
		if applied.Done() {
			//			fmt.Println("fin!", cur)
			return len(cur)
		}
		if len(cur) > 10 {
			continue
		}
		matches := applied.NeighborsMatching()
		//		fmt.Println(matches)
		for num, matching := range matches {
			next := make([]int, len(cur))
			copy(next, cur)
			next = append(next, num)
			q.Push(&cellData{
				nums:     next,
				priority: matching,
			})
		}
		// greedy because of PQ
	}
	return -1
}

type priorityQueue struct {
	data []*cellData
}

func newPQ() *priorityQueue {
	return &priorityQueue{
		data: make([]*cellData, 0),
	}
}

func (p *priorityQueue) Pull() []int {
	out := p.data[0].nums
	p.data = p.data[1:]
	return out
}

func (p *priorityQueue) Push(x *cellData) {
	p.data = append(p.data, x)
	sort.Sort(datas(p.data))
}
func (p *priorityQueue) Size() int { return len(p.data) }

type cellData struct {
	nums     []int
	priority int
}

type datas []*cellData

func (d datas) Len() int      { return len(d) }
func (d datas) Swap(i, j int) { d[i], d[j] = d[j], d[i] }
func (d datas) Less(i, j int) bool {
	return d[i].priority > d[j].priority
}
