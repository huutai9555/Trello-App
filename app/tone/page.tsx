'use client'
import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

export default function MetronomeApp() {
  const [bpm, setBpm] = useState(104); // BPM ban đầu
  const [targetBpm, setTargetBpm] = useState(116); // BPM ban đầu

  const [secondsLeft, setSecondsLeft] = useState(30); // Thời gian đếm ngược
  const [isRunning, setIsRunning] = useState(false); // Trạng thái chạy/dừng
  const intervalRef = useRef<any>(null); // Tham chiếu cho setInterval
  const toneTransportStarted = useRef(false); // Đảm bảo Tone.Transport chỉ start 1 lần

  // Hàm khởi tạo metronome
  const setupMetronome = () => {
    const click = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0,
        release: 0.05,
      },
    }).toDestination();

    // Phát metronome mỗi nhịp
    Tone.Transport.scheduleRepeat((time) => {
      click.triggerAttackRelease("C5", "1n", time);
    }, "4n"); // Phát mỗi 1/4 nốt
  };

  // Bắt đầu hoặc dừng metronome
  const toggleMetronome = () => {
    if (!isRunning) {
      // Bắt đầu metronome
      setIsRunning(true);

      // Khởi tạo metronome nếu chưa start trước đó
      if (!toneTransportStarted.current) {
        setupMetronome();
        toneTransportStarted.current = true;
      }

      Tone.Transport.bpm.value = bpm;
      Tone.Transport.start();

      // Bắt đầu đếm ngược 5 giây và tăng BPM
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            setBpm((prevBpm) => {
              Tone.Transport.bpm.value = prevBpm + 1; // Tăng BPM
              return prevBpm + 1;
            });
            return bpm === targetBpm ?  6000 : 30; // Reset thời gian đếm ngược
          }
          return prev - 1; // Giảm thời gian
        });
      }, 1000);
    } else {
      // Dừng metronome
      setIsRunning(false);
      Tone.Transport.stop();
      clearInterval(intervalRef.current); // Xóa interval
    }
  };

  // Clear interval khi component bị unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      Tone.Transport.stop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Metronome App</h1>
      <input type="number" onChange={(event) => {
        setBpm(+event.target.value)
      }} />
       <input type="number" onChange={(event) => {
        setTargetBpm(+event.target.value)
      }} />
      <p className="text-xl mb-2">
        <span className="font-bold">BPM:</span> {bpm}
      </p>
      <p className="text-xl mb-4">
        <span className="font-bold">Next BPM in:</span> {secondsLeft} seconds
      </p>
      <button
        onClick={toggleMetronome}
        className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
      >
        {isRunning ? "Stop Metronome" : "Start Metronome"}
      </button>
    
    </div>
  );
}
