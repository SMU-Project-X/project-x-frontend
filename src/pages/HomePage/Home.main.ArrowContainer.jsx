import * as itemS from "@/pages/HomePage/styled/Home.main.style"

function ArrowContainer({ color, rotate, count = 2 }) {
    return (
        <itemS.ArrowContainer>
            {Array.from({ length: count }).map((_, i) => (
                <itemS.ChevronImage key={i} src={color} $rotate={rotate} />
            ))}
        </itemS.ArrowContainer>
    )
}

export default ArrowContainer
