const CORES_DIPONIVEIS = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
]
const TONS_DISPONIVEIS = ["400", "500", "600", "700", "800", "900"]

export default function getRandomColor() {
  const cor = CORES_DIPONIVEIS[Math.floor(Math.random() * CORES_DIPONIVEIS.length)]
  const tom = TONS_DISPONIVEIS[Math.floor(Math.random() * TONS_DISPONIVEIS.length)]

  return `${cor}.${tom}`
}
