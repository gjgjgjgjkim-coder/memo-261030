export type MemoLabel = "blue" | "green" | "orange" | "pink";

export const categories = ["업무", "개인", "아이디어"];

// 글 속 일부만 굵게 쓰려면 { b: "..." }
export type Segment = string | { b: string };

export type Block =
  | { type: "h2" | "h3"; text: string }
  | { type: "p"; text: Segment[] }
  | { type: "list"; items: string[] };

export type Memo = {
  id: string;
  title: string;
  preview: string;
  date: string;
  createdAt: string;
  label: MemoLabel;
  category: string;
  pinned: boolean;
  inHome: boolean;
  body: Block[];
};

export const memos: Memo[] = [
  {
    id: "1",
    title: "주간 회의 안건 정리하기",
    preview: "금요일 10시, 시안 검수 기준 공유",
    date: "오늘",
    createdAt: "10월 30일 오전 9:10",
    label: "blue",
    category: "업무",
    pinned: true,
    inHome: true,
    body: [{ type: "p", text: ["금요일 10시, 시안 검수 기준 공유"] }],
  },
  {
    id: "2",
    title: "저녁 장보기 목록",
    preview: "우유, 계란, 사과, 커피 원두",
    date: "어제",
    createdAt: "10월 29일 오후 6:20",
    label: "green",
    category: "개인",
    pinned: true,
    inHome: true,
    body: [{ type: "list", items: ["우유", "계란", "사과", "커피 원두"] }],
  },
  {
    id: "3",
    title: "새 앱 아이디어 스케치",
    preview: "홈 화면에 메모 카드 넣어 보기",
    date: "오늘",
    createdAt: "10월 30일 오전 8:05",
    label: "pink",
    category: "아이디어",
    pinned: false,
    inHome: true,
    body: [{ type: "p", text: ["홈 화면에 메모 카드 넣어 보기"] }],
  },
  {
    id: "4",
    title: "병원 예약 전화하기",
    preview: "치과 정기 검진, 평일 오후",
    date: "어제",
    createdAt: "10월 29일 오후 2:30",
    label: "orange",
    category: "개인",
    pinned: false,
    inHome: true,
    body: [{ type: "p", text: ["치과 정기 검진, 평일 오후"] }],
  },
  {
    id: "5",
    title: "독서 모임 질문 3개",
    preview: "2장 마지막 문단에 대해",
    date: "수요일",
    createdAt: "10월 28일 오후 9:15",
    label: "green",
    category: "개인",
    pinned: false,
    inHome: true,
    body: [{ type: "p", text: ["2장 마지막 문단에 대해"] }],
  },
  {
    id: "6",
    title: "주말 제주 여행 준비",
    preview: "금요일 저녁에 출발해 일요일 밤에 돌아온다",
    date: "어제",
    createdAt: "10월 29일 오후 8:40",
    label: "green",
    category: "개인",
    pinned: false,
    inHome: false,
    body: [
      { type: "h2", text: "여행 개요" },
      {
        type: "p",
        text: [
          "금요일 저녁에 출발해 일요일 밤에 돌아온다. ",
          { b: "렌터카는 미리 예약" },
          "했고, 숙소는 공항 근처로 정했다.",
        ],
      },
      { type: "h3", text: "챙길 것" },
      {
        type: "list",
        items: ["신분증과 예약 확인서", "보조 배터리와 충전기", "얇은 바람막이"],
      },
      { type: "h3", text: "예약 현황" },
      {
        type: "p",
        text: [{ b: "항공권과 숙소는 완료" }, "했고, 렌터카는 목요일까지 확정한다."],
      },
      { type: "h3", text: "남은 질문" },
      {
        type: "p",
        text: [
          "일요일 점심을 공항 근처에서 먹을지 ",
          { b: "아직 정하지 못했다" },
          ".",
        ],
      },
    ],
  },
];

export function getMemo(id: string) {
  return memos.find((m) => m.id === id);
}
