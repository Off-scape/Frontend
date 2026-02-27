import React from 'react';
import Image from 'next/image';

interface Participant {
  id: string;
  avatar: string;
  name: string;
}

interface ParticipantAvatarsProps {
  participants: Participant[];
  count: number;
  maxDisplay?: number;
}

const ParticipantAvatars: React.FC<ParticipantAvatarsProps> = ({
  participants,
  count,
  maxDisplay = 4,
}) => {
  const displayedParticipants = participants.slice(0, maxDisplay);
  const remainingCount = Math.max(0, count - maxDisplay);

  return (
    <div className="flex items-center">
      {/* Avatar Stack */}
      <div className="flex -space-x-2">
        {displayedParticipants.map((participant, index) => (
          <div
            key={participant.id}
            className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
            style={{ zIndex: maxDisplay - index }}
            title={participant.name}
          >
            <Image
              src={participant.avatar}
              alt={participant.name}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
        ))}
      </div>

      {/* Participant Count */}
      <span className="ml-3 text-sm text-gray-600">
        {count} iştirakçı
      </span>
    </div>
  );
};

export default ParticipantAvatars;