import MemberImg from "./PicturePage.MemberDecoPage.MemberImg";
import { useLocation } from 'react-router-dom'

function MemberDropArea({ wrapperRef, imgRef, decorations, onDrop, onDragOver }) {
    const location = useLocation();
    const { selectedMember } = location.state || {};

    return (
        <div
            ref={wrapperRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
                position: "relative",
                width: "fit-content",
                margin: "0 auto",
            }}
        >
            <MemberImg imgRef={imgRef} imgSrc={selectedMember.profileImageUrl} />

            {decorations.map((deco, index) => (
                <img
                    key={index}
                    src={deco.imgSrc}
                    alt={`deco-${index}`}
                    style={{
                        position: "absolute",
                        top: deco.y,
                        left: deco.x,
                        width: "70px",
                        height: "70px",
                        pointerEvents: "none",
                    }}
                />
            ))}
        </div>
    );
}

export default MemberDropArea;