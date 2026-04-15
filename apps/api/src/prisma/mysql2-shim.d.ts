declare module 'mysql2/promise' {
  const mysql: {
    createConnection(url: string): Promise<{
      query<T = unknown[]>(sql: string): Promise<[T, unknown]>;
      end(): Promise<void>;
    }>;
  };

  export default mysql;
}
