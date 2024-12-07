import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DiaryEntry, NewDiaryEntry } from '../../types/types';

export const diaryApi = createApi({
  reducerPath: 'diaries',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1' }),
  endpoints: builder => ({
    getAllDiaries: builder.query<DiaryEntry[], void>({
      query: () => '/diaries',
    }),

    addNewDiary: builder.mutation<NewDiaryEntry, NewDiaryEntry>({
      query: (newDiary: NewDiaryEntry) => ({
        url: '/diaries',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newDiary,
      }),
    }),
  }),
});

export const { useGetAllDiariesQuery, useAddNewDiaryMutation } = diaryApi;
