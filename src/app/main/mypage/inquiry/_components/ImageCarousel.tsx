import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  // 드래그 중 마우스가 요소 밖으로 나가도 이벤트 처리
  useEffect(() => {
    const handleMouseUpOutside = () => {
      if (isSwiping) {
        finishSwipe();
      }
    };

    document.addEventListener('mouseup', handleMouseUpOutside);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside);
    };
  }, [isSwiping]);

  if (!images || images.length === 0) {
    return null;
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    handleSwipeMove(diff);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    const currentX = e.clientX;
    const diff = currentX - startXRef.current;
    handleSwipeMove(diff);
  };

  const handleSwipeMove = (diff: number) => {
    // 이미지가 1개면 스와이프 제한
    if (images.length <= 1) {
      setSwipeOffset(0);
      return;
    }

    // 양쪽 끝에서 저항감 주기
    let newOffset;
    if (
      (currentIndex === 0 && diff > 0) ||
      (currentIndex === images.length - 1 && diff < 0)
    ) {
      // 끝에 도달했을 때 저항감 주기 (실제 움직임의 1/3만 허용)
      newOffset = diff / 3;
    } else {
      newOffset = diff;
    }

    setSwipeOffset(newOffset);
  };

  const finishSwipe = () => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const threshold = containerWidth * 0.2; // 20% 이상 드래그하면 이미지 전환

    if (Math.abs(swipeOffset) > threshold) {
      // 다음/이전 이미지로 전환
      if (swipeOffset < 0 && currentIndex < images.length - 1) {
        // 왼쪽으로 드래그 - 다음 이미지
        setCurrentIndex(currentIndex + 1);
      } else if (swipeOffset > 0 && currentIndex > 0) {
        // 오른쪽으로 드래그 - 이전 이미지
        setCurrentIndex(currentIndex - 1);
      }
    }

    // 스와이프 상태 초기화
    setIsSwiping(false);
    setSwipeOffset(0);
  };

  const handleTouchEnd = finishSwipe;
  const handleMouseUp = finishSwipe;

  // 인디케이터 클릭으로 이미지 변경
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setSwipeOffset(0);
  };

  // 현재 보이는 이미지 위치 계산
  const getTransformValue = () => {
    const baseTransform = -currentIndex * 100; // 현재 인덱스 기반 위치
    const swipePercent =
      (swipeOffset / (containerRef.current?.clientWidth || 1)) * 100; // 드래그 기반 추가 위치
    return `translateX(${baseTransform + swipePercent}%)`;
  };

  return (
    <CarouselContainer>
      <CarouselViewport ref={containerRef}>
        <CarouselTrack
          style={{
            transform: getTransformValue(),
            transition: isSwiping ? 'none' : 'transform 0.3s ease-out',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {images.map((image, index) => (
            <CarouselSlide key={index}>
              <CarouselImage
                src={image}
                alt={`문의 이미지 ${index + 1}`}
                fill
                sizes='100%'
                style={{ objectFit: 'cover' }}
                draggable={false}
              />
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselViewport>

      {images.length > 1 && (
        <IndicatorContainer>
          {images.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </IndicatorContainer>
      )}
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CarouselViewport = styled.div`
  width: 100%;
  height: 335px;
  border-radius: 12px;
  overflow: hidden;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  position: relative;
`;

const CarouselTrack = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const CarouselSlide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  position: relative;
`;

const CarouselImage = styled(Image)`
  border-radius: 12px;
  user-select: none;
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2px;
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.primary.p100 : theme.gray.g20};
  cursor: pointer;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
`;
