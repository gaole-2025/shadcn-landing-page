import React from 'react';

const TextInput = () => {
  return (
    <div>
      <textarea
        className="w-full min-h-[120px] p-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-white resize-y focus:outline-none focus:border-[#1e40af] transition-colors placeholder:text-[#666666] text-sm"
        placeholder="A casual spring outfit with a white oversized shirt, black cropped pants, and white sneakers..."
      />
      <p className="text-xs text-[#666666] mt-2">
        💡 Tip: The more detailed description, the better results
      </p>
    </div>
  );
};

export default TextInput;