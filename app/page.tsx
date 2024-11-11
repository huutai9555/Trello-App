"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  questions5,
  questions,
  questions2,
  questions3,
  questions4,
  questions6,
} from "./data";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [result, setResult] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();
  const [questionState, setQuestionState] = useState([
    ...questions,
    ...questions2,
    ...questions3,
    ...questions4,
    ...questions5,
    ...questions6,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resopnse: boolean[] = [];
    // const cloneQuestionState = cloneDeep(questionState)
    questionState.forEach((question, index) => {
      resopnse.push(false);
    });
    setResult(resopnse);
    const newQuestionState = shuffle(questionState).map((question) => {
      return {
        ...question,
        answers: shuffle(question.answers),
      };
    });
    setQuestionState(newQuestionState);
    setIsLoading(false);
  }, []);

  const handleComplete = () => {
    const avarageScore = 10 / result.length;
    let score = 0;
    result.forEach((resultItem) => {
      if (resultItem) {
        score += avarageScore;
      }
    });
    toast({
      title: "Score",
      description: `Bạn đã thi được ${score} điểm`,
    });
    setShowResult(true);
  };

  function shuffle(array: any[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  if (isLoading) {
    return (
      <div className="h-screen p-4">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="py-20 flex flex-col gap-10 max-w-[1280px] mx-auto">
      {/* <Countdown date={Date.now() + 5000} onComplete={(value) => {
        if (value.completed) {
          handleComplete()
        }
      }} /> */}
      {questionState.map((question, index) => {
        return (
          <div className="flex-1 flex gap-5" key={index}>
            <div className="w-[100px]">
              <h2>Câu hỏi {index + 1}</h2>
              <p className={`${showResult ? "text-red-500" : "hidden"}`}>
                {result[index] ? "" : "Sai"}
              </p>
            </div>
            <RadioGroup
              className="p-2 shadow rounded flex-1 bg-gray-300"
              onValueChange={(value) => {
                const response = [...result];
                if (value === "true") {
                  response[index] = true;
                } else {
                  response[index] = false;
                }
                setResult(response);
              }}
            >
              <h3>{question.label}</h3>
              {question.answers.map((answer, childIndex) => {
                const uniqueId = uuidv4();
                return (
                  <div key={childIndex} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={
                        answer.isTrue
                          ? String(answer.isTrue)
                          : `false${childIndex}`
                      }
                      id={`option-${uniqueId}`}
                    />
                    <Label
                      htmlFor={`option-${uniqueId}`}
                      className={`${
                        showResult && answer.isTrue ? "text-rose-500" : ""
                      }`}
                    >
                      {answer.label}
                    </Label>
                  </div>
                );
              })}
              {/* {question.answers.map((answer, childIndex) => {
                return (
                  <div key={childIndex} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={
                        answer.isTrue
                          ? String(answer.isTrue)
                          : `false${childIndex}`
                      }
                      id={`option-${answer.label}`}
                    />
                    <Label
                      htmlFor={`option-${answer.label}`}
                      className={`${
                        showResult && answer.isTrue ? "text-rose-500" : ""
                      }`}
                    >
                      {answer.label}
                    </Label>
                  </div>
                );
              })} */}
            </RadioGroup>
          </div>
        );
      })}
      <div className="flex justify-center gap-3">
        <AlertDialog>
          {/* <Button className="w-fit"> */}
          <AlertDialogTrigger asChild>
            <Button>Submit</Button>
          </AlertDialogTrigger>
          {/* </Button> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Bạn có chắc muốn nộp bài không?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleComplete();
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button>Reset</Button>
      </div>
      <Toaster />
    </div>
  );
}

