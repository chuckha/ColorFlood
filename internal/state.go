package internal

type State struct {
	History []int
}

func NewState() *State {
	return &State{
		History: make([]int, 0),
	}
}
