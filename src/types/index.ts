export interface Company {
    id: string;
    name: string;
    rows: Row[];
  }
  
  export interface Row {
    name: string;
    role: string;
    type: "Full-time" | "Part-time";
    schedules: Schedule[];
  }
  
  export interface Schedule {
    date: string;
    amount: number;
  }
  