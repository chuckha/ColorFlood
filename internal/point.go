package internal

type Point struct {
	X, Y int
}

func (p Point) Left() Point {
	return Point{p.X - 1, p.Y}
}
func (p Point) Right() Point {
	return Point{p.X + 1, p.Y}
}
func (p Point) Up() Point {
	return Point{p.X, p.Y - 1}
}
func (p Point) Down() Point {
	return Point{p.X, p.Y + 1}
}
func (p Point) Neighbors() []Point {
	return []Point{
		p.Up(), p.Right(), p.Down(), p.Left(),
	}
}
